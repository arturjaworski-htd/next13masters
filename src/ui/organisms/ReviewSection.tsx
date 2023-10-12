import { ReviewForm } from "../molecules/ReviewForm";
import { getReviewsByProductId } from "@/api/review";

export const ReviewSection = async ({ productId }: { productId: string }) => {
	const { reviews } = await getReviewsByProductId(productId, "PUBLISHED");
	const { reviews: draftReviews } = await getReviewsByProductId(productId, "DRAFT");

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl font-bold">Reviews</h2>
			<div className="flex flex-col items-center gap-10 md:flex-row md:items-start ">
				<ReviewForm productId={productId} reviews={reviews} draftReviews={draftReviews} />
			</div>
		</div>
	);
};
