// import SalonCards from "@/common/salon-cards";

// const SalonCardList = () => {
//   return (
//     <div className="mb-6 md:mb-14 max-lg:w-[90%] w-[99vw] max-lg:mx-[6rem] max-sm:mx-auto mx-auto flex justify-center">
// 			<SalonCards title="Salons" showButton={true}/>
// 		</div>
//   );
// };

// export default SalonCardList;

import SalonCards from "@/common/salon-cards";

const SalonCardList = () => {
  return (
    <div className="px-2 w-[99vw] ">
            <SalonCards title="Salons" showButton={true} />
    </div>
  );
};

export default SalonCardList;
