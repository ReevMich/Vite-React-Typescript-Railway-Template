import { Component, For } from "solid-js";
import { getStrapiURL } from "~/lib/api";
import { Image } from "~/types";
import Container from "./container";

interface ServiceProps {
	title: string;
	subtitle: string;
	backgroundImage: Image;
	items: ServiceItem[]
}

interface ServiceItem {
	title: string;
	description: string;
	icon: Image;
}

const Services: Component<{ data: ServiceProps }> = (props) => {
	return (
		<section id="services" class="relative overflow-hidden bg-[#ca73f6] pt-20 pb-28 sm:py-32 text-white">
			<img
				src={getStrapiURL(props?.data?.backgroundImage?.url)}
				style="color:transparent"
				width={2245}
				height={1636}
				class="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
			/>
			<Container className="relative">
				<div class="max-w-2xl mx-auto text-center xl:max-w-none">
					<h2 class="font-display text-4xl tracking-tight text-white md:text-5xl">{props.data?.title}</h2>
					<p class="mt-6 text-lg tracking-tight text-purple-100">{props.data?.subtitle}</p>
				</div>
				<div class="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
					<div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-12 gap-x-8 px-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						<For each={props.data?.items}>
							{(item) => (
								<div class="sm:flex">
									<div class="sm:flex-shrink-0">
										<div class="flow-root">
											<img
												class="h-24 w-28"
												src={`${getStrapiURL(item.icon?.url)}`}
												alt=""
											/>
										</div>
									</div>
									<div class="mt-3 sm:mt-0 sm:ml-3">
										<h3 class="text-sm font-medium">{item.title}</h3>
										<p class="mt-2 text-sm ">
											{item.description}
										</p>
									</div>
								</div>
							)}
						</For>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Services;
