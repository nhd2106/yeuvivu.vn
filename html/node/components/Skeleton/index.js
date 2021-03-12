import React from 'react';
import MSkeleton from '@material-ui/lab/Skeleton';

export default function Skeleton() {
  return (
    <div>
      <MSkeleton variant="text" width='90%' />
      <MSkeleton variant="text" width='90%' height={40} />
      <MSkeleton variant="rect" width='90%' height={118} />
    </div>
  );
}