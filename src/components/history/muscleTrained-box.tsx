type MuscleTrainedHistoryBoxProps = {
  trainedMuscles: string[];
};

const MuscleTrainedHistoryBox: React.FC<MuscleTrainedHistoryBoxProps> = ({
  trainedMuscles,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary order-1">
      <h3 className="font-bold text-lg">Most muscles trained</h3>

      <div className="flex flex-col mt-5 space-y-3">
        {trainedMuscles.map((muscle, index) => (
          <div
            key={index}
            className="flex justify-between bg-whitePrimary dark:bg-darkSecondary p-3 rounded-md"
          >
            <span>
              {index + 1}. {muscle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuscleTrainedHistoryBox;
