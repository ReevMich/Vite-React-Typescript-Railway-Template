import { JSX, ParentComponent  } from "solid-js";
import clsx from "clsx";

const Container: ParentComponent<{ className?: string }> = ({ className, ...props }) => {
	return <div class={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{props.children}</div>;
};

export default Container;
