import { CheckerRunner } from "../../../src/checker/checkerRunner";
import { Printer } from "../../../src/printer";
import { SimpleFormat } from "../../../src/formatter/formats/simple";
import { Query } from "../../../src/reader/query";

beforeEach(() => {
  this.mockRunDatabaseChecksFn = CheckerRunner.prototype.runDatabaseChecks = jest.fn();
  this.mockRunSimpleChecksFn = CheckerRunner.prototype.runSimpleChecks = jest.fn();
  this.printer = new Printer(0, new SimpleFormat());
  this.runner = new CheckerRunner();
});

test("It does not run database checks when a database is not supplied", () => {
  this.runner.run([], this.printer, "");
  expect(this.mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});

test("It runs basic checks when no database is supplied", () => {
  const query = new Query();
  Query.prototype.getContent = jest.fn().mockReturnValue("SELECT test");
  this.runner.run([query], this.printer, "");
  expect(this.mockRunSimpleChecksFn).toHaveBeenCalledTimes(1);
});

test("No checks are ran if a query doesn't have content", () => {
  this.runner.run([], this.printer, "");
  expect(this.mockRunSimpleChecksFn).toHaveBeenCalledTimes(0);
  expect(this.mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});
