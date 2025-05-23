import { useActionState } from "react";
import "../App.css";

export default function Submit({ fetchTarget, setUsername, loading }) {
  async function submitAction(prevFormState, formData) {
    const enteredEmail = formData.get("email");
    const enteredName = formData.get("name");
    const enteredPassword = formData.get("password");

    if (!enteredEmail || !enteredName || !enteredPassword) {
      return {
        email: enteredEmail,
        name: enteredName,
        password: enteredPassword,
        message: "Please fill in all fields.",
      };
    }

    try {
      await fetchTarget();
      const res = await fetch(
        "https://unexpected-eastern-margin.glitch.me/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            username: enteredName,
            password: enteredPassword,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to register user");
      }

      const result = await res.json();
      console.log("User created:", result);

      setUsername(enteredName);

      return {
        email: "",
        name: "",
        password: "",
        message: "User registered successfully!",
      };
    } catch (error) {
      console.error("Error submitting form:", error);
      return {
        email: enteredEmail,
        name: enteredName,
        password: enteredPassword,
        message: "Error: " + error.message,
      };
    }
  }

  const [formState, formAction] = useActionState(submitAction, {
    email: "",
    name: "",
    password: "",
    message: "",
  });

  return (
    <>
      <form action={formAction}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={formState.email}
        />
        <input
          type="text"
          name="name"
          placeholder="Username"
          defaultValue={formState.name}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={formState.password}
        />
        <button type="submit">{loading ? "Loading..." : "Register"}</button>
      </form>

      {formState.message && <p>{formState.message}</p>}
    </>
  );
}
