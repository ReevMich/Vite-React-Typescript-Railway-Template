import clsx from "clsx";
import { Component, createEffect, createMemo, createResource, createSignal, onCleanup, Show } from "solid-js";
import fetchAPI from "~/lib/api";
import { useInView } from "~/utils/use-in-view";
import Container from "./container";

interface ReviewProps {
	title: string;
	subtitle: string;
	items: ReviewItem[];
}

interface ReviewColumnProps {
	className?: string;
	reviewClassName?: Function;
	msPerPixel?: number;
	items?: ReviewItem[];
	props?: Record<string, any>;
}

interface ReviewItem {
	title: string;
	body: string;
	author: string;
}

const Review = ({ title, body, author, className, ...props }) => {
	let animationDelay = createMemo(() => {
		let possibleAnimationDelays = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];
		return possibleAnimationDelays[Math.floor(Math.random() * possibleAnimationDelays.length)];
	});

	return (
		<div
			class={clsx("animate-fade-in overflow-hidden rounded-lg bg-white shadow opacity-0", className)}
			style={animationDelay()}
			{...props}
		>
			<div class="px-4 py-5 sm:p-6">
				<blockquote class="text-gray-900">
					<p class="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">{title}</p>
					<p class="mt-3 text-base leading-7">{body}</p>
				</blockquote>
				<figcaption class="mt-3 text-sm text-gray-600 before:content-['–_']"> {author}</figcaption>
			</div>
		</div>
	);
};

const splitArray = (array: any[], numParts) => {
	let result = [];
	for (let i = 0; i < array.length; i++) {
		let index = i % numParts;
		if (!result[index]) {
			result[index] = [];
		}
		result[index].push(array[i]);
	}
	return result;
};
const ReviewColumn: Component<ReviewColumnProps> = (props) => {
	let columnRef;
	let [columnHeight, setColumnHeight] = createSignal(0);
	let duration = createMemo(() => `${columnHeight() * props.msPerPixel}ms`);

	console.log(props);
	createEffect(() => {
		let resizeObserver = new window.ResizeObserver(() => {
			setColumnHeight(columnRef.offsetHeight);
		});

		resizeObserver.observe(columnRef);

		onCleanup(() => {
			resizeObserver.disconnect();
		});
	});

	return (
		<div
			ref={columnRef}
			class={clsx("animate-marquee space-y-8 py-4", props.className)}
			style={{ "--marquee-duration": duration() }}
		>
			{props?.items?.concat(props?.items).map((review, reviewIndex) => (
				<Review
					key={reviewIndex}
					aria-hidden={reviewIndex >= props?.items.length}
					className={props?.reviewClassName(reviewIndex % props?.items.length)}
					{...review}
				/>
			))}
		</div>
	);
};

const ReviewGrid: Component<{items: ReviewItem[]}> = (props) => {
	let containerRef;
	let isInView = useInView(containerRef, { once: true, amount: 0.4 });
	let columns = splitArray(props.items, 1);
	// columns = [columns[0], columns[1], splitArray(columns[2], 2)];

	createEffect(() => console.log(isInView()))
	return (
		<div
			ref={containerRef}
			class="relative grid h-[40rem] max-h-[100vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 md:grid-cols-1 lg:grid-cols-1"
		>
			{isInView && (
				<>
					<ReviewColumn
						items={[...columns[0] /* ...columns[2].flat(), ...columns[1]*/]}
						reviewClassName={(index) =>
							clsx(
								// index >= columns[0].length + columns[2][0].length && "md:hidden",
								index >= columns[0].length && "lg:hidden"
							)
						}
						msPerPixel={10}
					/>
					{/* <ReviewColumn
						reviews={[...columns[1], ...columns[2][1]]}
						className="hidden md:block"
						reviewClassName={(index) => index >= columns[1].length && "lg:hidden"}
						msPerPixel={15}
					/> */}
					{/* <ReviewColumn reviews={columns[2].flat()} className="hidden lg:block" msPerPixel={10} /> */}
				</>
			)}
			<div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
			<div class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
		</div>
	);
};

const Reviews: Component<{ data: ReviewProps }> = (props) => {
	const [reviewItems] = createResource(() => ({ path: "/api/reviews" }), fetchAPI);

	return (
		<section id="testimonials" class="relative overflow-hidden pt-20 pb-28 sm:py-32 bg-gray-50">
			<Container>
				<div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
					<h2 class="font-display text-4xl tracking-tight md:text-5xl">{props.data?.title}</h2>
					<p class="mt-6 text-lg tracking-tight">{props.data?.subtitle}</p>
				</div>
				<div class="lg:relative">
					<div class="mx-auto max-w-2xl py-24 sm:px-2 sm:py-32 lg:px-4">
						<Show when={reviewItems()?.data && reviewItems()?.data?.length} fallback={<div>Loading...</div>}>
							<ReviewGrid items={reviewItems()?.data} />
						</Show>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Reviews;
