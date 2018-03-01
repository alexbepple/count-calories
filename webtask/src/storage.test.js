import { assertThat, is, not } from "hamjest";
import sdT from "./storage";
import * as r from "ramda";

describe("Entries in storage", () => {
  const uninitializedStorageData = undefined;
  const entriesForFoo = "entries for foo";
  it("are empty for an uninitialized storage", () => {
    assertThat(sdT.getEntries("foo", uninitializedStorageData), is([]));
  });
  it("are equal to those that were saved", () => {
    assertThat(
      sdT.getEntries(
        "foo",
        sdT.setEntries("foo", entriesForFoo, uninitializedStorageData)
      ),
      is(entriesForFoo)
    );
  });
  it("are different from those that were saved for a different user", () => {
    assertThat(
      sdT.getEntries(
        "bar",
        sdT.setEntries("foo", entriesForFoo, uninitializedStorageData)
      ),
      not(is(entriesForFoo))
    );
  });
  it("overwrite previously saved entries", () => {
    assertThat(
      sdT.getEntries(
        "foo",
        sdT.setEntries(
          "foo",
          "new entries",
          sdT.setEntries("foo", "old entries", uninitializedStorageData)
        )
      ),
      is("new entries")
    );
  });
});
