import { Component, createEffect } from "solid-js";
import { getStrapiURL } from "~/lib/api";
interface HeroProps {
	title: string;
	subtitle: string;
	image: any;
}
const Hero: Component<{ data?: HeroProps }> = (props) => {
	return (
		<div class="container mx-auto ">
			<section class="relative">
				<div
					class="flex items-center justify-center h-[800px] bg-fixed bg-cover bg-no-repeat"
					style={{
						"background-image": `url(${getStrapiURL(props.data?.image?.url)})`,
						"background-position": "top -120px",
					}}
				>
					<div>
						<div class="text-[120px] font-bold tracking-tight text-white flex justify-center text-center items-center">
							{props.data?.title ?? ""}
						</div>
						<div class="relative -mx-10 mb-6">
							<div class="absolute inset-0 flex items-center" aria-hidden="true">
								<div class="w-full border-t border-white"></div>
							</div>
						</div>
						<div class="relative text-center text-white font-semibold tracking-tight text-lg">
							{props.data?.subtitle ?? ""}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Hero;
