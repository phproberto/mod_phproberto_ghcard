<?php
/**
 * @package     Github.Module
 * @subpackage  Card.Layout
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

extract($displayData);

/**
 * Layout variables
 * -----------------
 * @var   string           $cssClass        Module CSS class
 * @var   string           $cssId           Module CSS identifier
 * @var   object           $module          Module data as it comes from Joomla
 * @var   phprobertoModule  $moduleInstance  Module rendering this layout
 * @var   JRegistry        $params          Object with the module config
 * @var   stdClass         $profile         Array of items to render
 */

?>
<div class="github-card user-card">
	<div class="header">
		<a href="<?php echo $profile->html_url; ?>" class="avatar" target="_top"><img src="<?php echo $profile->avatar_url; ?>&amp;s=48"><strong><?php echo $profile->name; ?></strong> <span><?php echo $profile->login; ?></span></a>
	</div>
	<ul class="status">
		<li><a href="<?php echo $profile->html_url; ?>?tab=repositories" target="_top"><strong><?php echo $profile->public_repos; ?></strong><?php echo JText::_('MOD_GITHUB_CARD_LABEL_REPOSITORIES'); ?></a></li>
		<li><a href="<?php echo $profile->html_url; ?>/followers" target="_top"><strong><?php echo $profile->followers; ?></strong><?php echo JText::_('MOD_GITHUB_CARD_LABEL_FOLLOWERS'); ?></a></li>
	</ul>
	<div class="footer">
		<?php if ($profile->hireable) : ?>
			<a href="<?php echo $profile->blog; ?>" target="_top"><?php echo JText::_('MOD_GITHUB_CARD_LABEL_HIREABLE'); ?></a>
		<?php endif; ?>
	</div>
</div>
