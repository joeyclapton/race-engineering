type Options = {
  list: any[];
  params: {
    label: string;
    value: string;
  };
};

export const dataToSelectOptions = ({ list, params }: Options) => {
  const options = list.map((item: any) => ({
    label: item[params.label],
    value: item[params.value],
  }));

  return options;
};
