import { loginAction } from "../_actions/auth";

interface Props {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const next = params.next || "/admin";
  const hasError = params.error === "1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 border border-zinc-200">
        <h1 className="text-xl font-bold text-zinc-900 mb-1">Greentek Admin</h1>
        <p className="text-sm text-zinc-500 mb-6">
          Sign in to manage site content.
        </p>

        {hasError && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Incorrect username or password.
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1">
              Username
            </label>
            <input
              name="username"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 text-white text-sm font-semibold py-2.5 hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
