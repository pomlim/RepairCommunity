import { useState } from 'react';
import shopService from '@/services/shop';

const FilterTagModal = ({ repairTags, setFilter, updateShops }) => {
  const [checkedRepairTags, setCheckedRepairTags] = useState(
    repairTags.map((repairTag) => {
      return { ...repairTag, checked: false };
    })
  );

  const getRepairTag = async () => {
    const stringRepairTag = checkedRepairTags.map((repairTag) => {
      if (repairTag.checked === true) {
        return repairTag.attributes.name;
      }
    });
    const filterResp = shopService.GetShopsByTag(stringRepairTag);
    const [filterShops] = await Promise.all([filterResp]);
    updateShops(filterShops);
  };

  const onSubmit = () => {
    getRepairTag();
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
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-small leading-6 text-gray-900"
                      id="modal-title"
                    >
                      ปรับรูปแบบการซ่อม
                    </h3>
                    <h1
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      เลือกประเภทการซ่อม (เลือกได้มากกว่า 1)
                    </h1>
                    {repairTags.map((repairTag, index) => {
                      return (
                        <li key={index}>
                          <div className="toppings-list-item">
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={repairTag.attributes.name}
                              checked={repairTag.checked}
                              value={repairTag.id}
                              onChange={handleChange}
                            />
                            {repairTag.attributes.name}
                            {repairTag.checked}
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
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
