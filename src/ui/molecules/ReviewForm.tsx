import { addReview } from "@/api/review";
import { FormInput } from "@/ui/atoms/FormInput";
import { FormTextarea } from "@/ui/atoms/FormTextarea";

export const ReviewForm = ({ productId }: { productId: string }) => {
	async function handleCreateReviewAction(formData: FormData) {
		"use server";

		const review = {
			productId: formData.get("productId") as string,
			headline: formData.get("headline") as string,
			content: formData.get("content") as string,
			rating: Number(formData.get("rating")),
			name: formData.get("name") as string,
			email: formData.get("email") as string,
		};

		await addReview(review);
	}
	return (
		<div className="w-full max-w-md">
			<h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
			<p className="my-2 text-sm text-gray-600">
				If you’ve used this product, share your thoughts with other customers
			</p>
			<form
				data-testid="add-review-form"
				className="flex w-full flex-col gap-2"
				action={handleCreateReviewAction}
			>
				<input type="hidden" value={productId} name="productId" />
				<FormInput label="Review title" name="headline" required />
				<FormTextarea label="Review content" name="content" required />
				<FormInput label="Rating" name="rating" type="number" min="1" max="5" required />
				<FormInput label="Name" name="name" required />
				<FormInput label="Email" name="email" required type="email" />
				<button
					className="mt-6 rounded-md border bg-slate-800 px-8 py-2 text-white hover:bg-slate-600"
					type="submit"
				>
					Submit review
				</button>
			</form>
		</div>
	);
};
