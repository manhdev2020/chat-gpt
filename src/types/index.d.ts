type ListType = {
  data: any[];
  count: number;
};

type ListOutputValue = {
  totalPage: number;
  totalResult: number;
  list: any[];
};

type ExtendedResponse<T> = {
  data: T extends ListType ? ListOutputValue : T;
};
