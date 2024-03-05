export function extractMentions(inputString: string) {
  const regex = /@\[.*?\]\((.*?)\)/g;
  const mentions = inputString.match(regex) || [];
  const uniqueMentions = Array.from(
    new Set(
      mentions.map((mention: string) =>
        mention.substring(mention.lastIndexOf('(') + 1, mention.lastIndexOf(')'))
      )
    )
  );

  return {
    description: inputString,
    ...(uniqueMentions.length > 0 ? { mentions: uniqueMentions } : {}),
  };
}
