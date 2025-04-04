import SalonCards from "@/common/salon-cards";

const SalonCardList = () => {
  return (
    <div className="mb-6 md:mb-14 max-lg:w-[80%] w-[99vw] max-lg:mx-[4rem] mx-auto flex justify-center">
			<SalonCards title="Salons" showButton={true}/>
		</div>
  );
};

export default SalonCardList;
