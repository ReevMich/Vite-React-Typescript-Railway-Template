import clsx from "clsx"
import { Component } from "solid-js"

interface CardProp {
    title: string
    description: string
    thumbnailUrl: string
    onClick?: () => void
}
const Card: Component<CardProp> = (props) => {
    return (
        <>
            <div
                class={clsx(
                    "cursor-pointer overflow-hidden transition-all hover:ring-2 ring-purple-600 rounded-md bg-white shadow hover:shadow-2xl hover:shadow-black/10"
                )}
                onClick={props.onClick}
            >
                <img
                    class="object-cover object-top w-full h-[26rem]"
                    src={props.thumbnailUrl}
                    alt="image"
                />
                <div class="px-4 py-3 sm:p-6">
                    <blockquote class="text-gray-900">
                        <p class="mt-4 text-lg font-semibold leading-6">{props.title}</p>
                        <p class="mt-3 text-base leading-7 truncate">{props.description}</p>
                    </blockquote>
                </div>
            </div>
        </>
    )
}

export default Card
