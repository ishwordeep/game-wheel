declare module "spin-wheel" {
  type Segment = {
    label: string;
    color: string;
  };

  type SpinWheelProps = {
    segments: Segment[];
    spinDuration?: number;
    onFinished?: (segment: Segment) => void;
  };

  export default class SpinWheel {
    constructor(props: SpinWheelProps);
    spinToRandomSegment: () => void;
    spinToSegment: (index: number) => void;
  }
}
