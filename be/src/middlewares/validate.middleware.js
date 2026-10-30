const ApiError = require('../utils/ApiError');

function formatIssues(issues) {
  return issues.map((issue) => {
    const path = issue.path.filter((segment) => segment !== 'body' && segment !== 'query' && segment !== 'params');
    return {
      field: path.join('.') || String(issue.path[0] || 'request'),
      message: issue.message,
    };
  });
}

function validate(schemas = {}) {
  return (req, _res, next) => {
    const payload = {};

    if (schemas.body) {
      payload.body = req.body;
    }

    if (schemas.query) {
      payload.query = req.query;
    }

    if (schemas.params) {
      payload.params = req.params;
    }

    const schemaEntries = Object.entries(schemas);
    const parsed = {};

    for (const [key, schema] of schemaEntries) {
      const result = schema.safeParse(payload[key]);

      if (!result.success) {
        return next(new ApiError(422, 'Validation failed', formatIssues(result.error.issues)));
      }

      parsed[key] = result.data;
    }

    req.validated = parsed;

    if (parsed.body) {
      req.body = parsed.body;
    }

    next();
  };
}

module.exports = validate;
