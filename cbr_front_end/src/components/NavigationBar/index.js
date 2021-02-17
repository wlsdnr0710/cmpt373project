import React from "react";
import NavigationBarEntry from "../NavigationBarEntry";
import "./style.css";


//TODO: Fix importing all images
// const importNavigationIcons = (source) => {
// 	//Source: https://stackoverflow.com/questions/44607396/importing-multiple-files-in-react
// 	//Imports all without having to import them individually
// 	const images = {};
// 	source.keys().map((item,index) => { images[item.replace('./', '')] = source(item); });

// 	return images;
// }

const NavigationBar = () => {
	// const icons = importNavigationIcons("../../assets/svg/navigation_icons")
  return (
    <div class="side-navigation">
			<NavigationBarEntry label="Dashboard" destination="#"/>
			<NavigationBarEntry label="New Client" destination="#"/>
			<NavigationBarEntry label="New Visit" destination="#"/>
			<NavigationBarEntry label="New Referral" destination="#"/>
			<NavigationBarEntry label="All Clients" destination="#"/>
			<div className="sync">
			<NavigationBarEntry label="Sync" destination="#"/>
			</div>
    </div>
  );
};

export default NavigationBar;
