import { useState } from 'react';
import shopService from '@/services/shop';

const FilterTagModal = ({
  repairTags,
  updateRepairTags,
  updateShops,
  searchText,
  convertArrayToText,
  setFilter
}) => {
  const [checkedRepairTags, setCheckedRepairTags] = useState(repairTags);
  const getRepairTag = async () => {
    const checkedRepairTagResp = shopService.GetShopsBySearch(
      searchText,
      convertArrayToText(checkedRepairTags)
    );
    const [repairTagShops] = await Promise.all([checkedRepairTagResp]);
    updateShops(repairTagShops);
  };

  const onSubmit = () => {
    getRepairTag();
    updateRepairTags(checkedRepairTags);
    setFilter(false);
  };

  const onCancel = () => {
    setFilter(false);
  };

  const handleChange = (e) => {
    const update = checkedRepairTags.map((repairTag) => {
      if (parseInt(e.target.value) === repairTag.id) {
        return { ...repairTag, checked: e.target.checked };
      }
      return { ...repairTag };
    });
    setCheckedRepairTags(update);
  };

  return (
    <div>
      <div
        className="relative z-10 w-full"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-opacity-75 backdrop-blur-lg"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center p-0">
            <div className="relative overflow-hidden text-left transition-all transform bg-butter-light rounded-lg shadow-xl sm:my-8 w-full">
              <div className="px-10 pt-2 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 divide-y card divide-dashed">
                    <h3
                      className="font-medium leading-6 text-xs text-brown-mid font-kanit pb-2"
                      id="modal-title"
                    >
                      ปรับรูปแบบการซ่อม
                    </h3>
                    <h1
                      className="text-base text-brown-default font-medium leading-6 font-kanit py-4"
                      id="modal-title"
                    >
                      เลือกประเภทการซ่อม (เลือกได้มากกว่า 1)
                    </h1>
                    {checkedRepairTags.map((repairTag, index) => {
                      return (
                        <label key={index}>
                          <div className="toppings-list-item text-brown-default text-base font-kanit font-medium mb-4">
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={repairTag.attributes.name}
                              checked={repairTag.checked}
                              className="accent-green-default mr-4"
                              value={repairTag.id}
                              onChange={handleChange}
                            />
                            {repairTag.attributes.name}
                            {repairTag.checked}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full px-3 pt-4 pb-8">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="w-80 h-12 text-base font-normal rounded-full btn btn-primary bg-green-default text-brown-default font-kanit"
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTagModal;
