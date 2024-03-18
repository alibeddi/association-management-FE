import LoadingTableRow from './LoadingTableRow';

type Props = { fields: number; rowsPerPage?: number; noAvatar?: boolean; height: number };

export default function LoadingTable({ fields, rowsPerPage = 5, noAvatar = false, height }: Props) {
  return (
    <>
      {[...new Array(rowsPerPage || 5)].map((item, index) => (
        <LoadingTableRow
          height={height}
          key={index}
          fields={fields}
          avatarIndex={noAvatar ? undefined : 0}
        />
      ))}
    </>
  );
}
