export const LoadingSpinner = () => {
	return (
		<div className="flex h-screen flex-col items-center justify-center" aria-busy="true">
			<div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-slate-900"></div>
			<div className="mt-4 text-xl font-semibold text-slate-900">Loading...</div>
		</div>
	);
};
