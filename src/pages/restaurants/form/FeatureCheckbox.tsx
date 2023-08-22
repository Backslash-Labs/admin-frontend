import Checkbox from "base/Checkbox";
import { useContext, } from "react";
import { ResturantFormContext } from "./RestaurantFormContext";

const FeatureCheckbox = ({ feature }) => {

    const {
        selectedFeatures,
        setSelectedFeatures,
    } = useContext(ResturantFormContext);

    const selectedFeatureWithFeatureId = selectedFeatures.filter((selectedFeature) => selectedFeature === feature.id)

    const isChecked = selectedFeatureWithFeatureId.length > 0

    const onChange = ({ target }) => {
        const {
            value,
        } = target;
        
        if(isChecked){
            const i = selectedFeatures.indexOf(selectedFeatureWithFeatureId[0]);
            selectedFeatures.splice(i, 1);
        }else{
            selectedFeatures.push(feature.id)
        }
        setSelectedFeatures([...selectedFeatures]);
    }

    return (
        <Checkbox
            label={feature.name}
            checked={isChecked}
            onChange={onChange}
            value={feature.id}
        />
    )

}

export default FeatureCheckbox;