import { Component, createMemo } from "solid-js";
import { getStrapiURL } from "~/lib/api";
import Container from "./container";
interface AboutProps {
	title: string;
	subtitle: string;
	image: any;
}
const About: Component<{ data: AboutProps }> = (props) => {
	return (
		<section id="about" class="relative overflow-hidden pt-20 pb-28 sm:py-32 ">
			<main class="lg:relative tracking-tight">
				<Container>
					<div class="mx-auto w-full max-w-7xl pb-36 text-center lg:pb-48 lg:text-left">
						<div class="relative px-4 sm:px-8 lg:w-1/2 xl:pr-16">
							<h1 class="font-display text-4xl tracking-tight md:text-5xl">
								<span class="text-purple-700">{props.data?.title}</span>
							</h1>
							<p class="mt-6 text-lg tracking-tight">{props.data?.subtitle}</p>
						</div>
					</div>
					<div
						class="relative h-[800px] w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2 bg-fixed bg-cover bg-left-top bg-no-repeat"
						style={{ "background-image": `url(${getStrapiURL(props.data?.image?.url)})` }}
					></div>
				</Container>
			</main>
		</section>
	);
};

export default About;
