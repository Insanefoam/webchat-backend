//TODO: Separate GQL Problem and service error
export class Problem extends Error {
  constructor(public readonly problem: string) {
    super(`${problem}`);
  }
}
