'use client';
import { useEffect, useRef } from 'react';
import rig from '../../public/art/ako/rig.json';
import { sampleAkoPose, type AkoAction, type AkoPose } from '@/lib/ako-motion';

type PartName = keyof typeof rig.parts;
function Part({ name }: { name: PartName }) {
  const [x, y, width, height] = rig.parts[name].target;
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox={rig.parts[name].source.join(' ')}
      preserveAspectRatio="none"
      overflow="hidden"
    >
      <image href={rig.atlas} width={rig.atlasSize[0]} height={rig.atlasSize[1]} />
    </svg>
  );
}

function Eye({ side }: { side: 'left' | 'right' }) {
  return (
    <g data-joint={`${side}-eye`} transform={`translate(${side === 'left' ? 166 : 231} 178)`}>
      <ellipse rx="14" ry="19" fill="#142047" />
      <ellipse cx="1" cy="6" rx="10" ry="10" fill="#243e6f" />
      <g data-joint={`${side}-pupil`}>
        <ellipse cy="-2" rx="9" ry="13" fill="#101933" />
        <ellipse cx="-4" cy="-7" rx="4.2" ry="5" fill="#fffdfa" />
        <circle cx="5" cy="5" r="2.1" fill="#b8dcff" />
      </g>
    </g>
  );
}

/** Reusable articulated character. The same artwork stays attached to fixed pivots. */
export function AkoCharacter({
  action = 'idle',
  actionKey = 0,
  paused = false,
  motion = true,
  look,
}: {
  action?: AkoAction;
  actionKey?: number;
  paused?: boolean;
  motion?: boolean;
  look?: number;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const clock = useRef(0);
  const waveStart = useRef(-1);
  const lookTarget = useRef(look);
  const currentLook = useRef(-0.65);
  const previousPose = useRef(sampleAkoPose(0));
  lookTarget.current = look;
  useEffect(() => {
    waveStart.current = action === 'wave' ? clock.current : -1;
  }, [action, actionKey]);

  useEffect(() => {
    const root = svg.current;
    if (!root) return;
    const joints = Object.fromEntries(
      Array.from(root.querySelectorAll<SVGElement>('[data-joint]')).map((el) => [
        el.dataset.joint!,
        el,
      ]),
    );
    const transform = (name: string, value: string) =>
      joints[name].setAttribute('transform', value);
    const rotate = (joint: string, angle: number, part: PartName) => {
      const [x, y] = rig.parts[part].pivot;
      transform(joint, `rotate(${angle} ${x} ${y})`);
    };
    const paint = (pose: AkoPose) => {
      const { yaw, blink, breath } = pose;
      transform('chest', `translate(200 448) scale(1 ${1 + breath * 0.003}) translate(-200 -448)`);
      transform(
        'head',
        `translate(${yaw * 1.5} ${-breath * 0.7}) rotate(${pose.headTilt} 200 246)`,
      );
      transform('face', `translate(${yaw * 9} ${Math.abs(yaw) * 1.5})`);
      transform(
        'left-eye',
        `translate(166 178) scale(${1 + yaw * 0.055} ${Math.max(0.025, 1 - blink)})`,
      );
      transform(
        'right-eye',
        `translate(231 178) scale(${1 - yaw * 0.055} ${Math.max(0.025, 1 - blink)})`,
      );
      transform('left-pupil', `translate(${yaw * 2.5} 0)`);
      transform('right-pupil', `translate(${yaw * 2.5} 0)`);
      rotate('rest-arm', pose.restArm, 'restArm');
      rotate('upper-arm', pose.upperArm, 'upperArm');
      rotate('forearm', pose.forearm, 'forearm');
      const tail = `M144 406C105 426 65 409 70 374C75 341 68 321 ${pose.tailTipX} ${pose.tailTipY}`;
      joints.tail.setAttribute('d', tail);
      joints['tail-fill'].setAttribute('d', tail);
      joints['tail-light'].setAttribute('d', tail);
      root.dataset.look = yaw.toFixed(3);
    };
    if (!motion) {
      paint(sampleAkoPose(0, -1, -0.35));
      root.dataset.motion = 'still';
      return;
    }
    root.dataset.motion = paused ? 'paused' : 'running';
    if (paused) return;
    let frame = 0;
    let previous: number | undefined;
    const tick = (now: number) => {
      const dt = previous === undefined ? 0 : Math.min((now - previous) / 1000, 0.05);
      previous = now;
      clock.current += dt;
      const pose = sampleAkoPose(
        clock.current,
        waveStart.current < 0 ? -1 : clock.current - waveStart.current,
        lookTarget.current,
      );
      currentLook.current += (pose.yaw - currentLook.current) * (1 - Math.exp(-dt * 7));
      const filtered = sampleAkoPose(
        clock.current,
        waveStart.current < 0 ? -1 : clock.current - waveStart.current,
        currentLook.current,
      );
      for (const joint of ['headTilt', 'upperArm', 'forearm', 'restArm'] as const) {
        filtered[joint] =
          previousPose.current[joint] +
          (filtered[joint] - previousPose.current[joint]) * (1 - Math.exp(-dt * 20));
      }
      previousPose.current = filtered;
      paint(filtered);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, motion]);

  return (
    <svg
      ref={svg}
      className="ako-rig"
      viewBox="0 0 400 480"
      width="400"
      height="400"
      aria-hidden="true"
      focusable="false"
      data-rig-version="2"
    >
      <path
        data-joint="tail"
        d="M144 406C105 426 65 409 70 374C75 341 68 321 42 343"
        fill="none"
        stroke="#142047"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        data-joint="tail-fill"
        d="M144 406C105 426 65 409 70 374C75 341 68 321 42 343"
        fill="none"
        stroke="#f3a7ad"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        data-joint="tail-light"
        d="M144 406C105 426 65 409 70 374C75 341 68 321 42 343"
        fill="none"
        stroke="#ffd0c6"
        strokeWidth="3"
        strokeLinecap="round"
        transform="translate(0 -2)"
      />
      <g data-joint="chest">
        <Part name="body" />
      </g>
      <g data-joint="rest-arm">
        <Part name="restArm" />
      </g>
      <g data-joint="upper-arm">
        <Part name="upperArm" />
        <g data-joint="forearm">
          <Part name="forearm" />
        </g>
      </g>
      <g data-joint="head">
        <Part name="head" />
        <g data-joint="face">
          <Eye side="left" />
          <Eye side="right" />
          <Part name="muzzle" />
        </g>
      </g>
    </svg>
  );
}
