import type { PracticeQuestion, PracticeResult } from '@/lib/practice-types';
import { ChoiceOptions } from './choice-options';
import './practice.css';
import './ranked.css';

/**
 * A graded ranked paper. Students see it after release; instructors see it any time, can score
 * written answers left for review, and use `preview` to read the answer key before assigning.
 */
export function RankedReview({
  questions,
  result,
  preview = false,
  origins,
  scores,
  onScore,
  onRemove,
}: {
  questions: PracticeQuestion[];
  result: PracticeResult;
  preview?: boolean;
  origins?: Record<string, string>;
  scores?: Record<string, string>;
  onScore?: (key: string, value: string) => void;
  onRemove?: (questionId: string) => void;
}) {
  return (
    <div className="ranked-review">
      {questions.map((question) => {
        const graded = result.questions.find((q) => q.id === question.id);
        if (!graded) return null;
        const pending = graded.criteria.some((c) => c.needsReview);
        return (
          <fieldset className="practice-question" key={question.id}>
            <legend>
              {question.label}{' '}
              <span>
                {preview ? '' : `${graded.earned} / `}
                {question.points} points{pending ? ' · Pending review' : ''}
              </span>
            </legend>
            {(origins?.[question.id] || onRemove) && (
              <p className="practice-question-reference ranked-origin">
                {origins?.[question.id] && <span>From {origins[question.id]}</span>}
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(question.id)}
                    aria-label={`Remove ${question.label}`}
                  >
                    Remove question
                  </button>
                )}
              </p>
            )}
            {question.context && <p className="practice-question-context">{question.context}</p>}
            <p className="ranked-prompt">{question.prompt}</p>
            {question.type === 'mcq' ? (
              <fieldset className="ranked-choices" disabled>
                <ChoiceOptions
                  name={`${result.id}-${question.id}`}
                  label={question.label}
                  options={question.options!}
                  value={graded.answer}
                  multiple={question.multiple}
                  correctOptions={
                    graded.correctOptions ?? graded.acceptedOptions ?? [graded.correctOption]
                  }
                  onChange={() => {}}
                />
              </fieldset>
            ) : (
              !preview &&
              graded.answer.trim() && <p className="practice-original-answer">{graded.answer}</p>
            )}
            {!preview && !graded.answer.trim() && (
              <p className="practice-unanswered">Not answered</p>
            )}
            {question.type === 'frq' && (
              <div className="practice-rubric">
                <h3>Rubric answer</h3>
                {graded.criteria.map((criterion) => {
                  const key = `${question.id}/${criterion.id}`;
                  return (
                    <p key={criterion.id}>
                      {criterion.answer}
                      <span>
                        {preview
                          ? `${criterion.points} points`
                          : criterion.needsReview
                            ? 'Needs review'
                            : `${criterion.earned}/${criterion.points} points`}
                      </span>
                      {criterion.feedback && (
                        <span>
                          {criterion.gradedBy === 'gemini' ? 'Auto Grade feedback: ' : ''}
                          {criterion.feedback}
                        </span>
                      )}
                      {onScore && criterion.needsReview && (
                        <label className="ranked-score-input">
                          Points earned (maximum {criterion.points})
                          <input
                            type="number"
                            required
                            min={0}
                            max={criterion.points}
                            step="any"
                            value={scores?.[key] ?? ''}
                            onChange={(e) => onScore(key, e.target.value)}
                          />
                        </label>
                      )}
                    </p>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
