import SalonCards from "@/common/salon-cards";

const Saloons = () => {
	return (
		<div className="px-2 w-[99vw]  ">
			<SalonCards title="Salons"
				showButton={true}
				titleHref="/salons/all_salons"
				viewMoreHref="/salons/all_salons"
			/>
		</div>
	);
};

export default Saloons;
