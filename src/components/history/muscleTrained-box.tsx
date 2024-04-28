const MuscleTrainedHistoryBox = () => {
  const trained = ["Legs", "Neck", "Gluts", "Chest"];
  return (
    <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary order-1">
      <h3 className="font-bold text-lg">Most muscles trained</h3>

      <div className="flex flex-col mt-5 space-y-3">
        {trained.map((item, index) => (
          <div
            key={index}
            className="flex justify-between bg-whitePrimary dark:bg-darkSecondary p-3 rounded-md"
          >
            <span>
              {index + 1}. {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuscleTrainedHistoryBox;
