var paginate = (schema: any) => {
  schema.static(
    'paginate',
    async function (this: any, filter: any, options: any) {
      let sort = '';
      if (options.sortBy) {
        const sortingCriteria: any = [];
        options.sortBy.split(',').forEach((sortOption: any) => {
          const [key, order] = sortOption.split(':');
          sortingCriteria.push((order === 'desc' ? '-' : '') + key);
        });
        sort = sortingCriteria.join(' ');
      } else {
        sort = 'createdAt';
      }

      let project = '';
      if (options.projectBy) {
        const projectionCriteria: any = [];
        options.projectBy.split(',').forEach((projectOption: any) => {
          const [key, include] = projectOption.split(':');
          projectionCriteria.push((include === 'hide' ? '-' : '') + key);
        });
        project = projectionCriteria.join(' ');
      }

      const limit =
        options.limit && parseInt(options.limit.toString(), 10) > 0
          ? parseInt(options.limit.toString(), 10)
          : 10;
      const page =
        options.page && parseInt(options.page.toString(), 10) > 0
          ? parseInt(options.page.toString(), 10)
          : 1;
      const skip = (page - 1) * limit;

      const countPromise = this?.countDocuments(filter).exec();

      let aggregate = this?.aggregate();

      aggregate = aggregate.match(filter);

      aggregate = aggregate.sort(sort);

      aggregate = aggregate.skip(skip);

      aggregate = aggregate.limit(limit);

      if (project) aggregate = aggregate.project(project);

      if (options?.lookup?.length > 0) {
        options.lookup?.map(
          (lookupOptions: any) => (aggregate = aggregate.lookup(lookupOptions)),
        );
      }

      // Execute the aggregate pipeline
      const docsPromise = aggregate.exec();

      return Promise.all([countPromise, docsPromise]).then((values) => {
        const [totalResults, results] = values;
        const totalPages = Math.ceil(totalResults / limit);
        const result = {
          results,
          page,
          limit,
          totalPages,
          totalResults,
        };
        return Promise.resolve(result);
      });
    },
  );
};

export { paginate };
