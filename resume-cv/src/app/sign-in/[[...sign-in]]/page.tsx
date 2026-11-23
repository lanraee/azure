import { ClerkProvider, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <ClerkProvider>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fa",
        }}
      >
        <SignIn />
      </div>
    </ClerkProvider>
  );
}
