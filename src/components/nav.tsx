import { Component } from "solid-js";
import { A } from "solid-start";
interface NavProps {
	siteName: string
}
const Nav: Component<{data?: NavProps}> = (props) => {
  return (
		<header class="sticky top-0 z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900 bg-white">
			<nav aria-label="Global" class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
				<div class="relative flex items-center py-[2.125rem]">
					<div class="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
					<a class="mr-auto flex-none text-slate-900 uppercase text-2xl" href="/">
						<span class="sr-only">{props.data?.siteName ?? "Site Title."}</span>
						{props.data?.siteName ?? "Site Title."}
					</a>
					<div class="hidden lg:flex lg:items-center">
						<a href="#">Home</a>
						<a class="ml-8" href="#about">
							About
						</a>
						<a class="ml-8" href="#portfolio">
							Portfolio
						</a>
						<a class="ml-8" href="#services">
							Services
						</a>
						<a class="ml-8" href="#testimonials">
							Testimonials
						</a>
						<a class="ml-8" href="#contact">
							Contact
						</a>
					</div>
				</div>
			</nav>
		</header>
  );
}

export default Nav;
