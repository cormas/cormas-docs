import React, { useEffect, useState } from 'react';

export default function EmailLink({ user, domain }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    return <span>{user} [at] {domain.replace('.', ' [dot] ')}</span>;
  }

  return <a href={`mailto:${email}`}>{email}</a>;
}