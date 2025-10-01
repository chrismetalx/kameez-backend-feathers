export const joinCategories = () => async (context) => {

  const pipeline = [
    {
      $lookup: {
        from: 'categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true
      }
    }
  ];
  context.params.customPipeline = true;
  context.params.pipeline = pipeline;
}