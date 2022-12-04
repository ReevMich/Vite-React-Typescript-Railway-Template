import { Component, createEffect, createResource, createSignal, Show, Suspense } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import About from "~/components/about";
import Contact from "~/components/contact";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import Nav from "~/components/nav";
import Portfolio from "~/components/portfolio";
import Reviews from "~/components/reviews";
import Services from "~/components/services";
import fetchAPI from "~/lib/api";

const Index: Component = () => {
	const [globalData] = createResource(() => ({ path: "/api/global?populate=deep" }), fetchAPI);
	const [pageData] = createResource(() => ({ path: "/api/homepage?populate=deep" }), fetchAPI);
	createEffect(() => {
		console.log(globalData());
		console.log(pageData());
	});
	return (
		<main class="mx-auto max-w-screen-2xl">
			<Nav data={ globalData()?.data} />
			<Hero data={pageData()?.data?.Hero} />
			<About data={pageData()?.data?.About} />
			<Portfolio data={pageData()?.data?.Portfolio} />
			<Services data={pageData()?.data?.Services}/>
			<Reviews data={pageData()?.data?.Testimonials} /> 
			<Contact />
			<Footer />
		</main>
	);
};

export default Index;
