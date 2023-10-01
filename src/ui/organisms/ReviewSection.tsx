import { ReviewForm } from "../molecules/ReviewForm";
import { getReviewsByProductId } from "@/api/review";
import { ReviewListItem } from "@/ui/molecules/ReviewListItem";

export const ReviewSection = async ({ productId }: { productId: string }) => {
	const reviews = await getReviewsByProductId(productId);
	const draftReviews = await getReviewsByProductId(productId, "DRAFT");

	if (!reviews.length) {
		return <h1 className="text-center font-medium">No reviews for this product</h1>;
	}

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl font-bold">Reviews</h2>
			<div className="flex flex-col items-center gap-10 md:flex-row md:items-start ">
				<ReviewForm productId={productId} />

				<ul className="flex w-full flex-col gap-4" role="list">
					{reviews.map((review) => {
						return <ReviewListItem key={review.id} review={review} />;
					})}
					{draftReviews.map((review) => {
						return <ReviewListItem key={review.id} review={review} draft />;
					})}
				</ul>
			</div>
		</div>
	);
};
