import { ApolloCache, gql } from '@apollo/client';
import { Box, Flex, IconButton, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import { Post, useVoteMutation, VoteMutation } from '../../generated/graphql';

interface VotingProps {
  voteStatus: number | null | undefined;
  points: number;
  postId: number;
}

export const Voting: React.FC<VotingProps> = ({
  voteStatus,
  points,
  postId,
}) => {
  const [votingLoading, setVotingLoading] = useState<
    'upvote-loading' | 'downvote-loading' | 'not-loading'
  >('not-loading');

  const [vote] = useVoteMutation();

  const updateAfterVote = (value: number, cache: ApolloCache<VoteMutation>) => {
    // todo
    const data = cache.readFragment<{
      id: number;
      points: number;
      voteStatus: number | null;
    }>({
      id: 'Post:' + postId,
      fragment: gql`
        fragment _ on Post {
          id
          points
          voteStatus
        }
      `,
    });

    if (data) {
      if (data.voteStatus === value) {
        return;
      }

      const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
      cache.writeFragment({
        id: 'Post:' + postId,
        fragment: gql`
          fragment __ on Post {
            points
            voteStatus
          }
        `,
        data: { points: newPoints, voteStatus: value },
      });
    }
  };

  const handleVoting = async (voteType: 'upvote' | 'downvote') => {
    let value = 1;
    let loadingType: 'upvote-loading' | 'downvote-loading' | 'not-loading' =
      'not-loading';
    switch (voteType) {
      case 'upvote':
        if (voteStatus === 1) {
          return;
        }

        value = 1;
        loadingType = 'upvote-loading';

        break;
      case 'downvote':
        if (voteStatus === -1) {
          return;
        }

        value = -1;
        loadingType = 'downvote-loading';
        break;
      default:
        value = 1;
        loadingType = 'not-loading';
        break;
    }

    setVotingLoading(loadingType);

    await vote({
      variables: { postId, value },
      update: (cache) => updateAfterVote(value, cache),
    });

    setVotingLoading('not-loading');
  };

  return (
    <Box mr={4}>
      <Flex flexDirection='column' alignItems='center'>
        <IconButton
          data-vote-type='upvote'
          onClick={() => handleVoting('upvote')}
          icon='chevron-up'
          size='lg'
          variantColor={voteStatus === 1 ? 'teal' : undefined}
          aria-label='Vote Up'
          isLoading={votingLoading === 'upvote-loading'}
        />
        <Text padding='5px 0'>
          <strong>{points}</strong>
        </Text>

        <IconButton
          data-vote-type='downvote'
          onClick={() => handleVoting('downvote')}
          icon='chevron-down'
          size='lg'
          variantColor={voteStatus === -1 ? 'red' : undefined}
          aria-label='Vote Down'
          isLoading={votingLoading === 'downvote-loading'}
        />
      </Flex>
    </Box>
  );
};
