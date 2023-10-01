"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { removeItem } from "@/app/cart/actions";

export function RemoveButton({ itemId }: { itemId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				})
			}
			className="flex items-center justify-center text-sm font-medium text-red-700 hover:text-red-500 disabled:cursor-wait disabled:text-slate-400"
		>
			<Trash2 />
		</button>
	);
}
