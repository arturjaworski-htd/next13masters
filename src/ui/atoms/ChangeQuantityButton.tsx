"use client";
import { experimental_useOptimistic as useOptimistic, useTransition } from "react";

import { useRouter } from "next/navigation";
import { changeItemQuantity } from "@/app/cart/actions";

export function ChangeQuantityButton({ itemId, quantity }: { itemId: string; quantity: number }) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);
	const [, startTransition] = useTransition();
	const router = useRouter();

	const buttonClassName = "h-8 w-8 border text-2xl rounded-md disabled:text-slate-500";

	return (
		<form className="flex items-center justify-center gap-2">
			<span data-testid="quantity" className="text-center">
				{optimisticQuantity}
			</span>
			<button
				data-testid="decrement"
				className={buttonClassName}
				type="submit"
				disabled={optimisticQuantity <= 1}
				formAction={() =>
					startTransition(async () => {
						setOptimisticQuantity(optimisticQuantity - 1);
						await changeItemQuantity(itemId, optimisticQuantity - 1);
						router.refresh();
					})
				}
			>
				-
			</button>
			<button
				data-testid="increment"
				className={buttonClassName}
				type="submit"
				formAction={() =>
					startTransition(async () => {
						setOptimisticQuantity(optimisticQuantity + 1);
						await changeItemQuantity(itemId, optimisticQuantity + 1);
						router.refresh();
					})
				}
			>
				+
			</button>
		</form>
	);
}
