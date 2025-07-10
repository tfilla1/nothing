import { adventurer, avataaars, identicon, initials, lorelei, micah, thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { computed, ref } from "vue";

export interface AvatarStyle {
  title: string
  value: any
}

export type AvatarStyleName = 'adventurer' | 'avataaars' | 'identicon' | 'initials' | 'lorelei' | 'micah' | 'thumbs';

export default function useAvatars() {
  const avatarStyles =
    computed(() => [
      { title: 'adventurer', value: adventurer },
      { title: 'avataaars', value: avataaars },
      { title: 'identicon', value: identicon },
      { title: 'initials', value: initials },
      { title: 'lorelei', value: lorelei },
      { title: 'micah', value: micah },
      { title: 'thumbs', value: thumbs },
    ] as AvatarStyle[])

  const selectedAvatarStyle = ref()

  const generateAvatar = (username: string, styleName?: AvatarStyleName) => {
    const chosenStyle = avatarStyles.value.find(x => x.title === styleName)?.value
    const avatar = createAvatar(chosenStyle ?? avataaars, {
      backgroundColor: ['ff00aa'],
      seed: username
    })

    return avatar.toDataUri()
  }

  return {
    generateAvatar,
    avatarStyles,
    selectedAvatarStyle
  };
}
