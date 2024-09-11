const Progress = (props) => {
  return (
    <div class="box-content p-4 flex justify-center">
      <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
        <div
          class="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${props.width}` }}
        ></div>
      </div>
    </div>
  );
};
export default Progress;
