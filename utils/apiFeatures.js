class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ['sort', 'page', 'limit', 'fields'];
		excludedFields.forEach(el => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort(sortOptions) {
		let sortBy = sortOptions || this.queryString.sort;

		if (sortBy) {
			sortBy = sortBy.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		}
		else {
			this.query = this.query.sort('-_id');
		}

		return this;
	}

	limitFields(fields) {
		let requestedFields = fields || this.queryString.fields;

		if (requestedFields) {
			requestedFields = requestedFields.split(',').join(' ');
			this.query = this.query.select(requestedFields);
		}
		else {
			this.query = this.query.select('-__v');
		}

		return this;
	}

	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = APIFeatures;