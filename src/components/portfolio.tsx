import clsx from "clsx";
import { Component, createSignal, For, Show } from "solid-js";
import { A } from "solid-start";
import { getStrapiURL } from "~/lib/api";
import Card from "./card";
import Container from "./container";
import Modal from "./modal";
import { marked } from "marked";
import sanitizeHtml, { defaults } from 'sanitize-html';


interface PortfolioProps {
    title: string;
    subtitle: string;
    articles: any[];
}

const Portfolio: Component<{ data: PortfolioProps }> = (props) => {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    let markdownDiv: HTMLDivElement | undefined;

    const openModal = (article) => {
        setIsModalOpen(true);

        if (markdownDiv) {
            markdownDiv.innerHTML = sanitizeHtml(article.content, {
                allowedAttributes: {
                    ...addStyleAttributeToTags(),
                }
            });
        }
    };
    return (
        <>
        <section id="portfolio" class="relative overflow-hidden pt-20 pb-28 sm:py-32 bg-gray-50">
            <Container>
                <div class="max-w-2xl mx-auto text-center mb-16">
                    <h2 class="font-display text-4xl tracking-tight md:text-5xl">{props.data?.title}</h2>
                    <p class="mt-6 text-lg tracking-tight">
                        {props.data?.subtitle}
                    </p>
                </div>
                <div class="lg:relative">
                    <div class="mx-auto max-w-7xl sm:px-2 lg:px-4">
                        <div class="relative grid grid-cols-1 items-start gap-8 px-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
                            <For each={props.data?.articles.slice(0, 3)} fallback={<h4>Uhh oh something happened!</h4>}>
                                {(item, index) =>
                                    <Card title={item.title} description={item.description} thumbnailUrl={getStrapiURL(item.thumbnail?.url)} onClick={() => openModal(item)} />
                                }
                            </For>
                        </div>
                    </div>
                </div>
            </Container>
            </section>
            <Modal isOpen={isModalOpen()} setIsOpen={setIsModalOpen}>
                <div class='max-w-none' ref={markdownDiv} />
            </Modal>
        </>
    );
};

export default Portfolio;

function addStyleAttributeToTags() {
    const map = new Map(Object.entries(defaults.allowedAttributes));
    
    defaults.allowedTags.forEach((key) => {
        if (map.has(key)) {
            map.has(key) && !map.get(key).includes('style') && map.get(key).push('style');
        } else {
            map.set(key, ['style']);
        }
    });
    
    return Object.fromEntries(map.entries())
}