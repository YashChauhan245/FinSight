const AuthLayout = ({ children }) => {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:min-h-[calc(100vh-4rem)] md:grid-cols-2 md:items-center md:gap-12 md:py-14 lg:gap-20">
      <div className="flex justify-center">{children}</div>
      <aside className="hidden space-y-5 rounded-xl bg-ledger p-8 text-ledger-foreground md:block lg:p-12">
        <h2 className="font-serif text-4xl tracking-tight lg:text-5xl">See the whole picture.</h2>
        <p className="max-w-sm leading-relaxed text-ledger-muted">Keep your accounts and plans together, with one place to review the month.</p>
        <dl className="divide-y divide-ledger-muted/30 border-y border-ledger-muted/30 text-sm">
          <div className="flex justify-between gap-2 py-3"><dt className="text-ledger-muted">Example income</dt><dd className="tabular-nums">₹1,10,140</dd></div>
          <div className="flex justify-between gap-2 py-3"><dt className="text-ledger-muted">Example spending</dt><dd className="tabular-nums">₹46,433</dd></div>
        </dl>
      </aside>
    </div>
  );
};

export default AuthLayout;
