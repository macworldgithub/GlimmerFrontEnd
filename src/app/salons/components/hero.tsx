import { cn } from "@/lib/utils";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
const Hero = () => {
	return (
		<div
			className="hero mb-8 min-h-[75vh] lg:min-h-[65vh]"
			style={{
				background:
					"linear-gradient(135deg, rgba(255,199,89,1) 5%, rgba(255,199,89,1) 80%, rgba(255,255,255,1) 100%)",
			}}
		>
			<div className="hero-content">
				<div className="">
					<div className="prose mx-2 mb-4 text-lg lg:mb-8 lg:text-2xl">
						<h1>Book local beauty and wellness services</h1>
					</div>
					<div className="mx-2 flex flex-col gap-2 rounded-md bg-white p-2 lg:hidden">
						<SearchFilterSection
							placeholder="Salons"
							position={1}
							icon={<HiOutlineSearch className="size-5 opacity-70" />}
						/>
						<SearchFilterSection
							placeholder="Location"
							icon={<IoLocationSharp className="size-5 opacity-70" />}
						/>
						<div className="flex gap-2">
							<SearchFilterSection
								placeholder="Price"
								icon={<IoMdPricetags className="size-5 opacity-70" />}
							/>
							<SearchFilterSection
								placeholder="Gender"
								icon={<FaPerson className="size-5 opacity-70" />}
							/>
						</div>
						<button className="btn btn-neutral btn-block">Search</button>
					</div>
					<div className="hidden items-center justify-between rounded-full bg-white px-1 lg:flex">
						<SearchFilterSection
							placeholder="Salons"
							position={1}
							icon={<HiOutlineSearch className="size-5 opacity-70" />}
						/>
						<HorizontalDivider className="hidden lg:block" />
						<SearchFilterSection
							placeholder="Location"
							icon={<IoLocationSharp className="size-5 opacity-70" />}
						/>
						<HorizontalDivider className="hidden lg:block" />

						<SearchFilterSection
							placeholder="Price"
							icon={<IoMdPricetags className="size-5 opacity-70" />}
						/>
						<HorizontalDivider className="hidden lg:block" />
						<SearchFilterSection
							placeholder="Gender"
							icon={<FaPerson className="size-5 opacity-70" />}
						/>
						<button className="btn btn-neutral rounded-full">Search</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
const HorizontalDivider = ({ className }: { className?: string }) => (
	<div className={cn("mx-2 h-[80%] w-[2px] bg-base-300", className)}></div>
);
const SearchFilterSection = ({
	icon,
	placeholder = "Products / Salons",
	position = 0,
}: {
	icon: React.ReactNode;
	placeholder: string;
	position?: 1 | 2 | 3 | 4 | 0;
}) => {
	return (
		<div className="dropdown w-full lg:w-[20%]">
			<label
				className={cn(
					"input max-lg:input-bordered flex h-12 items-center gap-2 p-0 max-lg:px-4 lg:h-14",
					position === 1 && "lg:rounded-l-full lg:pl-4",
					position === 4 && "lg:rounded-r-full",
				)}
				tabIndex={0}
			>
				<div className="">{icon}</div>
				<input type="text" className="w-full" placeholder={placeholder} />
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content menu top-16 z-[1] w-full rounded-box border border-base-300 bg-base-100 p-2 shadow lg:w-72"
			>
				<li>
					<p>Item 1</p>
				</li>
				<li>
					<p>Item 2</p>
				</li>
			</ul>
		</div>
	);
};
