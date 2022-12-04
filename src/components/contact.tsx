// import HCaptcha from "solid-hcaptcha";
import { createScriptLoader } from '@solid-primitives/script-loader';
import clsx from "clsx";
import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import fetchAPI from "~/lib/api";
import Container from "./container";


const Contact: Component = () => {
	const [fields, setFields] = createStore();
	let recaptchaRef: any;
	const [done, setDone] = createSignal(false);

	onMount(() => {
		createScriptLoader({
			src: 'https://js.hcaptcha.com/1/api.js',
		});
	});

	const submitForm = async (form) => {
		form.preventDefault();
		console.log(form);
		const result = await fetchAPI({
			path: "/api/contacts", init: {
				method: "POST",
				mode: "cors",
				body: JSON.stringify({
					data: fields,
				}),
				headers: {
					"Content-Type": "application/json",
				}
			}
		});
		if (result) {
			setDone(true);
		}
	}

	createEffect(() => {
		console.log(recaptchaRef);
	})
	const handleHCaptchaVerify = async (infg) => {
		console.log(infg);
	}

	return (
		<section id="contact" class="bg-white pt-20 pb-28 sm:py-32">
			<Container>
				<div class="max-w-2xl mx-auto text-center mb-16">
					<h2 class="font-display text-4xl tracking-tight md:text-5xl">Let's work together</h2>
					<p class="mt-6 text-lg tracking-tight">
						Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
					</p>
				</div>
				<div class="mt-12 relative mx-auto max-w-xl">
					<Show when={!done()}>
						<form onSubmit={submitForm} class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
							<div>
								<label for="first-name" class="block text-sm font-medium text-gray-700">
									First Name
								</label>
								<div class="mt-1">
									<input
										required
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="given-name"
										class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-purple-500 focus:ring-purple-500"
										onInput={(e) => setFields({ firstname: e.currentTarget.value })}
									/>
								</div>
							</div>
							<div>
								<label for="last-name" class="block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<div class="mt-1">
									<input
										required
										type="text"
										name="last-name"
										id="last-name"
										autocomplete="given-name"
										class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-purple-500 focus:ring-purple-500"
										onInput={(e) => setFields({ lastname: e.currentTarget.value })}
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label for="email" class="block text-sm font-medium text-gray-700">
									Email
								</label>
								<div class="mt-1">
									<input
										required
										type="email"
										name="email"
										id="email"
										autocomplete="email"
										class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-purple-500 focus:ring-purple-500"
										onInput={(e) => setFields({ email: e.currentTarget.value })}
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label for="subject" class="block text-sm font-medium text-gray-700">
									Subject
								</label>
								<div class="mt-1">
									<input
										required
										id="subject"
										name="subject"
										type="text"
										autocomplete="subject"
										class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-purple-500 focus:ring-purple-500"
										onInput={(e) => setFields({ subject: e.currentTarget.value })}
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label for="message" class="block text-sm font-medium text-gray-700">
									Message
								</label>
								<div class="mt-1">
									<textarea
										required
										id="message"
										name="message"
										rows="4"
										class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-purple-500 focus:ring-purple-500"
										onInput={(e) => setFields({ message: e.currentTarget.value })}
									></textarea>
								</div>
							</div>
							<div class="sm:col-span-2">
								{/* <HCaptcha
									sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
									onVerify={handleHCaptchaVerify}
								/> */}
								<div
									class="h-captcha"
									data-sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
									data-callback={handleHCaptchaVerify } />

							</div>
							<div class="sm:col-span-2">
								<button
									type="submit"
									class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Let's talk
								</button>
							</div>
						</form>
					</Show>
					<Show when={done()}>
						<p class="text-center text-lg py-20">
							Message sent! <br /> I'll get back to you as soon as possible.
						</p>
					</Show>
				</div>
			</Container>
		</section>
	);
};

export default Contact;

