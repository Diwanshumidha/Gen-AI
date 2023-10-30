"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "./action";
import { useEffect } from "react";

const initialState = {
  message: "null",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </form>
  );
}
