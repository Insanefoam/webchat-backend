export class Problem extends Error {
  constructor(public readonly problem: string) {
    super(`Service error ${problem}`);
  }
}
