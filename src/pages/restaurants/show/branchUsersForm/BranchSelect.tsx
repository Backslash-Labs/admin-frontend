import classNames from "lib/classNames";

const BranchSelect = ({ branch, selectedBranches, setSelectedBranches }) => {

    const fselectedBranches = selectedBranches.filter(selectedBranch => selectedBranch == branch.id)

    const isSelected = fselectedBranches.length > 0;

    const onSelect = () => {
        if (isSelected) {
            const i = selectedBranches.indexOf(fselectedBranches[0])
            selectedBranches.splice(i, 1);
        } else {
            selectedBranches.push(branch.id)
        }
        setSelectedBranches([...selectedBranches])
    }

    return (
        <div
            className={
                classNames(
                    "rounded-md border border-green-850 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 my-3 text-center",
                    isSelected ? "bg-green-850 text-white" : "text-green-850",
                )
            }
            onClick={onSelect}
        >
            {branch.location}
        </div>
    )
}

export default BranchSelect;