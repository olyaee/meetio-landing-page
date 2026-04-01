export function AiReportHeading() {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-extrabold tracking-tight">
        Speak the bug.{" "}
        <span className="text-muted">AI writes the report.</span>
      </h2>
      <p className="text-base text-muted mt-3 max-w-[540px] mx-auto leading-relaxed">
        Just describe what happened with your voice. meetio transcribes it and
        generates a structured bug report with steps to reproduce, expected vs
        actual behavior, and console errors.
      </p>
    </div>
  );
}
