// Starting layouts for new pages.
export const noteTemplates = [
  { id: 'blank', name: 'Blank page', description: 'An empty page.', html: '<p><br></p>' },
  {
    id: 'cornell',
    name: 'Cornell notes',
    description: 'Cues, notes, then a summary in your own words.',
    html:
      '<blockquote data-callout="question"><p><strong>Cues</strong>: questions and key words to quiz yourself with later.</p></blockquote><ul><li><br></li></ul>' +
      '<h2>Notes</h2><ul><li><br></li></ul><h2>Summary</h2><p><br></p>',
  },
  {
    id: 'vocab',
    name: 'Vocabulary',
    description: 'Terms and definitions, ready for quick recall.',
    html: '<h2>Terms</h2><ul><li><strong>Term</strong>: definition</li></ul><h2>Easily confused</h2><ul><li><br></li></ul>',
  },
  {
    id: 'lab',
    name: 'Lab report',
    description: 'Question, hypothesis, data and conclusion.',
    html: '<h2>Question</h2><p><br></p><h2>Hypothesis</h2><p><br></p><h2>Materials and method</h2><ol><li><br></li></ol><h2>Observations</h2><ul><li><br></li></ul><h2>Conclusion</h2><p><br></p>',
  },
  {
    id: 'review',
    name: 'Test review',
    description: 'What you missed and what to study next.',
    html: '<h2>Questions I missed</h2><ul data-checklist="true"><li data-checked="false"><br></li></ul><h2>Why I missed them</h2><ul><li><br></li></ul><h2>Study next</h2><ul data-checklist="true"><li data-checked="false"><br></li></ul>',
  },
  {
    id: 'binder',
    name: 'Binder page',
    description: 'A dense reference page for tournament day.',
    html: '<blockquote data-callout="key"><p><strong>Must know</strong></p></blockquote><h2>Formulas</h2><ul><li><br></li></ul><h2>Tables and diagrams</h2><p>Paste images here.</p><h2>Facts</h2><ul><li><br></li></ul>',
  },
] as const;
